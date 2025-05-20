import os

data = []
for dir_name in os.listdir("pages"):
    with open(f"pages/{dir_name}/page.html", "r", encoding="utf-8") as file:
        data.append(file.read())

with open("data.txt", "w", encoding="utf-8") as file:
    file.write("\n\n".join(data))
