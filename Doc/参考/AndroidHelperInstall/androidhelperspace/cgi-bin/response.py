#!/usr/bin/python3
import base64
import sys
encode = sys.argv[2]
data = base64.b64decode(encode)

w = open("../image/"+sys.argv[1]+".png","wb")
w.write(data)
w.close()
