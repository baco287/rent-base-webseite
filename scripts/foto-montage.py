"""Setzt eine RentBase-Smartphone-Ansicht perspektivisch in das KI-Handfoto ein.

Aufruf:  python scripts/foto-montage.py <bildschirm.png> <ausgabe.webp>
Bildschirm-PNG: mit ../Rent-Base-Video/cap-screen.mjs (RATIO=0.447) aufgenommen.
"""
import os, sys
import numpy as np
from PIL import Image, ImageFilter

src_png, out_path = sys.argv[1], sys.argv[2]
S = 2
photo = Image.open('assets-ki/hand-smartphone.png').convert('RGB')
W, H = photo.size
a = np.asarray(photo).astype(int)
white = (a[:, :, 0] > 238) & (a[:, :, 1] > 238) & (a[:, :, 2] > 238)
box = np.zeros_like(white); box[225:770, 585:850] = True   # Bildschirmbereich im Foto
white &= box
ys, xs = np.nonzero(white); y0, y1 = ys.min(), ys.max()
rows = np.arange(y0 + 40, y1 - 40)
left = np.array([np.nonzero(white[y])[0].min() for y in rows]); right = np.array([np.nonzero(white[y])[0].max() for y in rows])
cols = np.arange(int(np.percentile(xs, 20)), int(np.percentile(xs, 80)))
top = np.array([np.nonzero(white[:, x])[0].min() for x in cols]); bot = np.array([np.nonzero(white[:, x])[0].max() for x in cols])
fl, fr, ft, fb = (np.polyfit(rows, left, 1), np.polyfit(rows, right, 1), np.polyfit(cols, top, 1), np.polyfit(cols, bot, 1))
def inter(fv, fh):
    y = (fh[0] * fv[1] + fh[1]) / (1 - fh[0] * fv[0]); return (fv[0] * y + fv[1], y)
corners = [inter(fl, ft), inter(fr, ft), inter(fr, fb), inter(fl, fb)]
big = photo.resize((W * S, H * S), Image.LANCZOS)
scr = Image.open(src_png).convert('RGB'); sw, sh = scr.size
dst = [(x * S, y * S) for x, y in corners]; srcpts = [(0, 0), (sw, 0), (sw, sh), (0, sh)]
A, B = [], []
for (x, y), (u, v) in zip(dst, srcpts):
    A += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]; B += [u, v]
coef = np.linalg.solve(np.array(A, float), np.array(B, float))
warped = scr.transform(big.size, Image.PERSPECTIVE, tuple(coef), Image.BICUBIC)
mask = Image.fromarray((white * 255).astype('uint8')).filter(ImageFilter.MaxFilter(3)).resize(big.size, Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.8))
out = big.copy(); out.paste(warped, (0, 0), mask)
out.paste(Image.new('RGB', big.size, (255, 255, 255)), (0, 0), mask.point(lambda v: int(v * 0.05)))
os.makedirs(os.path.dirname(out_path), exist_ok=True)
out.save(out_path, quality=88, method=6)
print(out_path, out.size)
