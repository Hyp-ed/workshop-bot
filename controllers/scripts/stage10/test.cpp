#include <iostream>

#include "pod.h"

int main() {
  Pod pod;
  std::cout << "Voltage: " << pod.bms.get_voltage() << std::endl;
  std::cout << "Acceleration: " << pod.nav.get_acceleration() << std::endl;
  return 0;
}