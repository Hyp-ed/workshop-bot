CC = g++
DEBUG = -g
CFLAGS = -std=c++11 -Wall -c -O3 $(DEBUG)
LFLAGS = -Wall $(DEBUG)

test : test.o othermk
	$(CC) $(LFLAGS) test.o navigation.o accelerometer.o -o test

test.o : test.cpp navigation.h accelerometer.h
	$(CC) $(CFLAGS) test.cpp

.PHONY : othermk
othermk :
	make navigation.o accelerometer.o

clean :
	rm *.o test
