from PIL import Image
import os

img_path = 'static-site/assets/images/bhoomi-logo-white-1-1536x526.png'
img = Image.open(img_path)

max_dim = max(img.size)
square_img = Image.new('RGBA', (max_dim, max_dim), (0, 0, 0, 0))

x = (max_dim - img.size[0]) // 2
y = (max_dim - img.size[1]) // 2
square_img.paste(img, (x, y))

square_img = square_img.resize((512, 512), Image.Resampling.LANCZOS)

square_img.save('static-site/assets/images/favicon.png')

os.makedirs('my-app/public/assets/images', exist_ok=True)
square_img.save('my-app/public/assets/images/favicon.png')

print("Favicon generated successfully.")
