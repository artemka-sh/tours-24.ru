import os
from bs4 import BeautifulSoup as Soup


with open("out.txt", "r", encoding="utf-8") as file:
    data = file.read().split("\n\n\n")


for text, dir_name in zip(data, os.listdir("pages")):
    html = Soup(text, "html.parser")
    with open(f"pages/{dir_name}/page_ru.html", "w", encoding="utf-8") as file:
        file.write(html.prettify())
