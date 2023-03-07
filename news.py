from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import requests
import json
import io

root = "https://www.google.com/"
link = "https://www.google.com/search?q=latest+government+financial+schemes&rlz=1C1CHZN_enIN935IN935&tbm=nws&source=lnt&tbs=qdr:d&sa=X&ved=2ahUKEwiY-ueDt8n9AhXV1TgGHUkyBhEQpwV6BAgBEBY&biw=1707&bih=706&dpr=1.13"


results = []

req = Request(link, headers={'User-Agent': 'Mozilla/5.0'})
webpage = urlopen(req).read()
with requests.Session() as c:
    soup=BeautifulSoup(webpage,'html5lib')
    for item in soup.find_all('div',attrs={'class':'Gx5Zad fP1Qef xpd EtOod pkphOe'}):
        raw_link=(item.find('a',href=True)['href'])
        link = (raw_link.split("/url?q=")[1]).split('&sa=U&')[0]
        title= item.find('div',attrs={'class':'BNeawe vvjwJb AP7Wnd'}).get_text()
        
        description= item.find('div',attrs={'class':'BNeawe s3v9rd AP7Wnd'}).get_text()

        title= title.replace(",","")
        description= description.replace(",","")

        time= item.find('span',attrs={'class':'r0bn4c rQMQod'}).get_text()

        data = {
        'title': title,
        'link': link,
        'description': description,
        'time': time
         }
        results.append(data)
    with open('news_results.json', 'w') as outfile:
        json.dump(results, outfile)
        