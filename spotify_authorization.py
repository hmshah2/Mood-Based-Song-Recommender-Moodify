# authorization.py
import tekore as tk

def auth():
  client_id  = “XXXXXXXXX”
  secret_key = “XXXXXXXYY”
  token = tk.request_client_token(client_id, secret_key)
  return tk.Spotify(token)

import sys
import authorization   # which one is created just now
import pandas as pd
import time

# lets authorize and retrieve spotify object
spotify = authorization.auth()

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
#df.to_csv("arousal_dataset.csv", index = False)