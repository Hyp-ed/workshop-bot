#include <iostream>

#include "navigation.h"
#include "accelerometer.h"

int main() {
  Navigation nav;
  nav.add_accelerometer(new Accelerometer);
  std::cout << "Velocity: " << nav.get_velocity() << std::endl;
  std::cout << "Position: " << nav.get_position() << std::endl;
  return 0;
}