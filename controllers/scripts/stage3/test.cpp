#include <iostream>

#include "pod.h"

int main()
{
  Pod pod;
  std::cout << "Name: " << pod.get_name() << std::endl;
  std::cout << "Maximum speed: " << pod.get_max_speed() << std::endl;
  std::cout << "Temperature: " << pod.get_temperature() << std::endl;
  return 0;
}