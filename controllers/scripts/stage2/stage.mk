CC = g++
DEBUG = -g
CFLAGS = -std=c++11 -c -O3 $(DEBUG)
LFLAGS = -Wall $(DEBUG)

test : test.o pod.o accelerometer.o
	$(CC) $(LFLAGS) test.o pod.o accelerometer.o -o test

test.o : test.cpp accelerometer.h
	$(CC) $(CFLAGS) test.cpp

pod.o : pod.cpp pod.h accelerometer.h
	$(CC) $(CFLAGS) pod.cpp

accelerometer.o : accelerometer.cpp accelerometer.h
	$(CC) $(CFLAGS) accelerometer.cpp

clean :
	rm *.o test
