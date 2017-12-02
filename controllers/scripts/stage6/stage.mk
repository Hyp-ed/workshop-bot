CC = g++
DEBUG = -g
CFLAGS = -std=c++11 -c -O3 $(DEBUG)
LFLAGS = -Wall $(DEBUG)

test : 
	make bms.o

clean :
	rm bms.o
