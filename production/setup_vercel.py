# python 3.8

import json
import os

def update_var(k,v,env):
    print(k,v,env)
    rm_cmd = f"vercel env rm -y {k} {env}"
    os.system(rm_cmd)
    cmd = f"printf %s {v} | vercel env add {k} {env}"
    os.system(cmd)

print ("Choose env: 1. production, 2. preview")
env = int(input())
env = "production" if env==1 else "preview"

items = None
with open('./production/.env.json') as f:
    data = json.load(f)
    items = list(data.items())
    
    # Print items
    for i, (k, v) in enumerate(items):
        print (f"{i}. {k}: {v}")

    # Get Input
    print ('enter variable to update. (0=Update All)')
    i = int(input())
    if i==0:
        for i, (k, v) in enumerate(items):
            update_var(k,v,env)

    # Update vars
    if 0 < i < len(items):
        k, v = items[i]
        update_var(k,v,env)
        