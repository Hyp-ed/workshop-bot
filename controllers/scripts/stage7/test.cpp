#include <iostream>

#include "navigation.h"
#include "accelerometer.h"

int main() {
  Navigation nav;
  nav.add_accelerometer(new Accelerometer);
  std::cout << "Acceleration: " << nav.get_acceleration() << std::endl;
  return 0;
}