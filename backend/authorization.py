# authorization.py
import tekore as tk
import spotipy
from tqdm import tqdm
from spotipy.oauth2 import SpotifyClientCredentials

import sys
import authorization   
import pandas as pd
import time

# import SPOTIPY_CLIENT_ID = '983bdba20e524ca997c58d8250b088d9'
# import SPOTIPY_CLIENT_SECRET='d787de6d91b2409b9a68467558c5f7fb'
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

genres = spotify.recommendation_genre_seeds()

data_dict = {
  "id":[], 
  "genre":[], 
  "track_name":[], 
  "artist_name":[],
  "valence":[],     
  "energy":[],      
  "danceability": []
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
      data_dict["danceability"].append(track_features.danceability)


 
# Store data in pandas dataframe
df = pd.DataFrame(data_dict)

# Drop duplicates
df.drop_duplicates(subset = "id", keep = "first", inplace = True)
df.to_csv("arousal_dataset.csv", index = False)

#mood 1 = happy, mood 2 = sad, mood 3 = angry, mood 4 = romantic, mood 5 = anxious

#REPLACE MOODVALS W/ ACTUAL VALS FROM WEBSITE
moods = [50, 50, 50, 50, 50]
moodvals = np.array(moods)

# valence = 1.0 correlates with happiness and positve emotions, 0.0 correlates with negative emotions
# happiness and sadness have most impact, other emotions have half as much impact
valenceval = moodvals[0] - moodvals[1] - (0.5*(moodvals[2])) + (0.5*(moodvals[3])) - (0.5*(moodvals[4])) 
# max val is 50 happiness, 50 romantic, so divide by 75 as max value
valenceval = valenceval / (float)(75) 
# if more negative emotions, set as 0
if valenceval < 0:
  valenceval = 0.0

# energy = 1.0 correlates with intensity, like death metal, 0.0 correlates with mellowness
# here, we base energy value on happiness and anger only
energyval = (moodvals[0] + moodvals[2]) / (float)(100);

# danceability = 1.0 correlates with most danceable, 0.0 correlates with least danceable
# here, we base danceability on happiness, but want less danceable songs based on if you are sad, angry, or anxious
danceabilityval = moodvals[0] - moodvals[1] - (0.2*(moodvals[2])) - (0.2*(moodvals[4]));
danceabilityval = danceabilityval / 50;


def getSong(input, df, range):
  foundSong = false
  for i in 100:
      optimalValence = (df.loc[i].at["valence"] > valenceval - 0.1 and df.loc[i].at["valence"] <= valenceval + 0.1)
      optimalEnergy = (df.loc[i].at["energy"] > energyval - 0.1 and df.loc[i].at["energy"] <= energyval + 0.1)
      optimalDance = (df.loc[i].at["danceability"] > danceabilityval - 0.1 and df.loc[i].at["danceability"] <= danceabilityval + 0.1)
      if (optimalValence and optimalEnergy and optimalDance):
        foundSong = true
        print(df.loc[i].at["artist_name"])
        print(df.loc[i].at["track_name"])
        break
if not foundSong: #again with larger margins
  for i in 100:
      optimalValence = (df.loc[i].at["valence"] > valenceval - 0.2 and df.loc[i].at["valence"] <= valenceval + 0.2)
      optimalEnergy = (df.loc[i].at["energy"] > energyval - 0.2 and df.loc[i].at["energy"] <= energyval + 0.2)
      optimalDance = (df.loc[i].at["danceability"] > danceabilityval - 0.2 and df.loc[i].at["danceability"] <= danceabilityval + 0.2)
      if (optimalValence and optimalEnergy and optimalDance):
        foundSong = true
        print(df.loc[i].at["artist_name"])
        print(df.loc[i].at["track_name"])
        break
#still no match?
if not foundSong:
  print("Rick Astley")
  print("Never Gonna Give You Up")
  #print(input, df)
