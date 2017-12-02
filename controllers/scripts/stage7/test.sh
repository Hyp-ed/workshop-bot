#!/bin/bash

make -f stage.mk test > /dev/null
./test
make -f stage.mk clean > /dev/null
