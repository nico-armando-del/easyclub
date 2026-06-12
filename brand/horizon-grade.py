#!/usr/bin/env python3
"""
Étalonnage couleur signature EasyClub « Horizon ».
Pose une colorimétrie unique sur n'importe quelle photo pour que toute la
banque d'images soit reconnaissable : noirs remontés vers l'encre, hautes
lumières crème, légère désaturation matte, soupçon de menthe dans les ombres.

Usage : python3 horizon-grade.py photo1.jpg photo2.png ...
Sort un fichier <nom>-horizon.jpg à côté de chaque image.
"""
import sys, os
import numpy as np
from PIL import Image

INK   = np.array([14, 17, 22]) / 255.0    # noirs remontés vers cette teinte
CREAM = np.array([250, 250, 247]) / 255.0  # hautes lumières plafonnées ici
MINT  = np.array([61, 220, 151]) / 255.0   # teinte poussée dans les ombres

DESAT   = 0.80   # 1 = couleurs d'origine, plus bas = plus matte
MINT_SH = 0.05   # dose de menthe dans les ombres
GAMMA   = 0.96   # <1 éclaircit légèrement les midtones

def grade(path, out):
    a = np.asarray(Image.open(path).convert("RGB"), np.float32) / 255.0
    luma = (a * np.array([0.299, 0.587, 0.114])).sum(2, keepdims=True)
    a = luma + (a - luma) * DESAT                 # désaturation
    a = INK + (CREAM - INK) * a                   # map matte encre->crème
    sh = np.clip(1.0 - luma, 0, 1) ** 1.5         # masque des ombres
    a = a + (MINT - 0.5) * sh * MINT_SH           # menthe dans les ombres
    a = np.clip(np.clip(a, 0, 1) ** GAMMA, 0, 1)  # midtones
    Image.fromarray((a * 255).astype(np.uint8)).save(out, quality=92)
    print("ok", out)

if __name__ == "__main__":
    for p in sys.argv[1:]:
        base, _ = os.path.splitext(p)
        grade(p, base + "-horizon.jpg")
