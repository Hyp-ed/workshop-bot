CC = g++
DEBUG = -g
CFLAGS = -std=c++11 -Wall -c -O3 $(DEBUG)
LFLAGS = -Wall $(DEBUG)

test : test.o othermk
	$(CC) $(LFLAGS) test.o bms.o -o test

test.o : test.cpp bms.h
	$(CC) $(CFLAGS) test.cpp

.PHONY : othermk
othermk :
	make bms.o

clean :
	rm *.o test
