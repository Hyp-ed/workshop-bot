#include <iostream>

#include "bms.h"

int main() {
  BatteryManagementSystem bms;
  std::cout << "Voltage: " << bms.get_voltage() << std::endl;
  std::cout << "Current: " << bms.get_current() << std::endl;
  return 0;
}