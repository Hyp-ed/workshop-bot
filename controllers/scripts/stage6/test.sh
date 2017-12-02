#!/bin/bash

make -f stage.mk test > /dev/null

make -f stage.mk clean > /dev/null
