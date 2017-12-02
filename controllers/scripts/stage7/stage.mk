CC = g++
DEBUG = -g
CFLAGS = -std=c++11 -c -O3 $(DEBUG)
LFLAGS = -Wall $(DEBUG)

test : test.o navigation.o accelerometer.o
	$(CC) $(LFLAGS) test.o navigation.o accelerometer.o -o test

test.o : test.cpp navigation.h accelerometer.h
	$(CC) $(CFLAGS) test.cpp

navigation.o : navigation.cpp navigation.h accelerometer.h
	$(CC) $(CFLAGS) navigation.cpp

accelerometer.o : accelerometer.cpp accelerometer.h
	$(CC) $(CFLAGS) accelerometer.cpp

clean :
	rm *.o test
