import socket
import time

server_address = ('127.0.0.1', 12321)
message = 'This is the message.  It will be repeated.'
i = 0
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

while True:
	i+=1
	message2 = str(i)+" "+message
	time.sleep(3)
	sent = s.sendto(message2, server_address)
	data, server = s.recvfrom(1024)
	print(data)

s.close()