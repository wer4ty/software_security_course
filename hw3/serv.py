import socket

HOST = '127.0.0.1'
PORT = 12321

while True:
	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
	s.bind((HOST, PORT))
	data, addr = s.recvfrom(1024)
	print ('Connected by', addr)
	print (data)
	s.close()