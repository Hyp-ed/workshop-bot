CC = g++
DEBUG = -g
CFLAGS = -std=c++11 -Wall -c -O3 $(DEBUG)
LFLAGS = -Wall $(DEBUG)

test : test.o othermk
	$(CC) $(LFLAGS) test.o pod.o accelerometer.o navigation.o bms.o -o test

test.o : test.cpp
	$(CC) $(CFLAGS) test.cpp

.PHONY : othermk
othermk :
	make main

clean :
	rm *.o test main
