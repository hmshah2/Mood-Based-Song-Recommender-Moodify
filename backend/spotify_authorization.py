# authorization.py
import tekore as tk
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

import sys
import authorization   # which one is created just now
import pandas as pd
import time

import SPOTIPY_CLIENT_ID= '983bdba20e524ca997c58d8250b088d9'
import SPOTIPY_CLIENT_SECRET='d787de6d91b2409b9a68467558c5f7fb'
#export SPOTIPY_REDIRECT_URI='your-app-redirect-url'

def auth():
  client_id  = "983bdba20e524ca997c58d8250b088d9"
  secret_key = "d787de6d91b2409b9a68467558c5f7fb"
  token = tk.request_client_token(client_id, secret_key)
  return tk.Spotify(token)


# lets authorize and retrieve spotify object
spotify = authorization.auth()
moods = ["happy", "sad", "excited"]
input = "happy"

#adele = 'spotify:artist:4dpARuHxo51G3z768sgnrY'
#sp = spotipy.Spotify()
#artist = sp.artist(adele)
#print(artist)
#user = sp.user('plamere')
#print(user)

genres = spotify.recommendation_genre_seeds()

data_dict = {
  "id":[], 
  "genre":[], 
  "track_name":[], 
  "artist_name":[],
  "valence":[],     # <-- this is our psychological value
  "energy":[]       # <-- this too 
}
  
  
# Get recommendation for each genre
for gender in tqdm(genres):
      
  recs = spotify.recommendations(genres = [gender], limit = 100)
  recs = eval(recs.json().replace("null", "-999").replace("false", "False").replace("true", "True"))["tracks"]
  
  for track in recs:
      data_dict["id"].append(track["id"])
      data_dict["genre"].append(genre)
      track_meta = spotify.track(track["id"])
      data_dict["track_name"].append(track_meta.name)
      data_dict["artist_name"].append(track_meta.album.artists[0].name)
      track_features = spspotifytrack_audio_features(track["id"])
      data_dict["valence"].append(track_features.valence)
      data_dict["energy"].append(track_features.energy)



# Store data in pandas dataframe
df = pd.DataFrame(data_dict)

# Drop duplicates
df.drop_duplicates(subset = "id", keep = "first", inplace = True)
df.to_csv("arousal_dataset.csv", index = False)

def getSong(input, df):
  if (input == "happy"):
    for i in 10:
      if (df.loc[i].at["valence"] > 0.8 and df.loc[i].at["valence"] <= 1.0):
        print(df.loc[i].at["artist_name"])
        print(df.loc[i].at["track_name"])
        break

  if (input == "sad"):
    for i in 10:
      if (df.loc[i].at["valence"] >= 0.0 and df.loc[i].at["valence"] < 3.0):
        print(df.loc[i].at["artist_name"])
        print(df.loc[i].at["track_name"])
        break
  
  if (input == "excited"):
    for i in 10:
      if (df.loc[i].at["energy"] > 50 and df.loc[i].at["energy"] < 80):
        print(df.loc[i].at["artist_name"])
        print(df.loc[i].at["track_name"])
        break

#recommend the first song that is happy
print(input, df)