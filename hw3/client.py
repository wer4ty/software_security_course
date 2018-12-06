import socket

server_address = ('127.0.0.1', 12321)
message = 'This is the message.  It will be repeated.'

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sent = s.sendto(message, server_address)

s.close()
