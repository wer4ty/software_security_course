import socket
from scapy.all import *



HOST = '127.0.0.1'
PORT = 12321

while True:
 	s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
 	s.bind((HOST, PORT))
 	data, addr = s.recvfrom(100)
 	print (addr)
 	print (data)
 	data += "CR/LF"
 	sent = s.sendto(data, addr)
s.close()