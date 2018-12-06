import socket
import time

from scapy.all import *

# set interface
conf.iface="lo0"

# create IP packet
ip_pkt = IP()/UDP(dport=12321)
ip_pkt.payload = "payload test message"
#ip_pkt.dport = 12321
ip_pkt.dst = "127.0.0.1"
ip_pkt.src = "127.0.0.1"

# send out packet
send(ip_pkt)


#host="127.0.0.1"
#message="A"*496+"B"*500
#packet=IP(dst=host,id=12345)/UDP(sport=12300,dport=12321)/message
 
#frags=fragment(packet,fragsize=100)
 
#counter=1
#for fragment in frags:
#  print "Packet no#"+str(counter)
  #print "==================================================="
  #fragment.show() #displays each fragment
#  counter+=1
#  sr(fragment)
#  time.sleep(3)


# server_address = ('127.0.0.1', 12321)
# message = 'This is the message.  It will be repeated.'
# i = 0
# s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# while True:
# 	i+=1
# 	message2 = str(i)+" "+message
# 	time.sleep(3)
# 	sent = s.sendto(message2, server_address)
# 	data, server = s.recvfrom(1024)
# 	print(data)

# s.close()