#include <iostream>

#include "pod.h"

int main()
{
  Pod pod;
  std::cout << "Name: " << pod.get_name() << std::endl;
  return 0;
}