# Thank you, you have completed all the exercises.

Please change this text and leave your feedback on the workshop here.


# Git Exercise

1. Each person in the pair needs to `git clone` this repo
2. Decide, who is Person A and who is Person B
3. Tasks will be appearing below. After you complete one, another one appears. There is 10 in total.
4. First 6 tasks are always only for one person (it alternates between A and B)
5. In the remaining tasks, you will work in parallel and might even need to resolve some conflicts.

## Tasks
1. Person A - `pod.cpp` - Name your pod
    * Open `pod.cpp` file and locate TASK 1
    * Type the name for your pod inside the double-quotes (you should discuss the choice of the name with your teammate)
2. Person B - `pod.cpp` - Choose max speed
    * Open `pod.cpp` file and locate TASK 2
    * Tell us what the max speed of your pod is by replacing the 0 in the code with a real number
3. Person A - `pod.h` and `pod.cpp` - Tempereture inside the pressure vessel
    * Open `pod.h`, locate place for TASKS 3&4 and copy-paste the following line there
        ```c++
        double get_temperature();
        ```
    * Open `pod.cpp`, locate place for TASKS 3&4 and copy-paste the following code there. Change the 0 to something else.
        ```c++
        double Pod::get_temperature()
        {
          return 0;
        }
        ```
    * When done, commit both files in a single commit (ofc don't forget push and stuff as always)
4. Person B - `pod.h` and `pod.cpp` - Pressure inside the pressure vessel
    * Open `pod.h`, locate place for TASKS 3&4 and copy-paste the following line below the one from previous task
        ```c++
        double get_pressure();
        ```
    * Open `pod.cpp`, locate place for TASKS 3&4, copy the following code and paste it below the function from previous task. Change the 0 to something else.
        ```c++
        double Pod::get_pressure()
        {
          return 0;
        }
        ```
    * When done, commit both files in a single commit (ofc don't forget push and stuff as always)
5. Person A - `main.cpp` and `Makefile` - Main executable
    * Create a new file called `main.cpp` and copy the following code to it
        ```c++
        #include <iostream>
        #include "pod.h"

        int main()
        {
          Pod pod;
          std::cout << "Name: " << pod.get_name() << std::endl;
          std::cout << "Maximum speed: " << pod.get_max_speed() << std::endl;
          std::cout << "Temperature: " << pod.get_temperature() << std::endl;
          std::cout << "Pressure: " << pod.get_pressure() << std::endl;
          return 0;
        }
        ```
    * Open `Makefile`, locate place for TASK 5 and uncomment the code there to get something like
        ```mk
        main : main.o pod.o bms.o navigation.o accelerometer.o
	        $(CC) $(OBJS) $(LFLAGS) main.o -o main

        main.o : main.cpp pod.h bms.h navigation.h accelerometer.h
	        $(CC) $(CFLAGS) main.cpp
        ```
    * Notice the difference in the output of `git status` for the newly created file
    * Commit `main.cpp` and `Makefile` in separate commits
6. Person B - `bms.cpp`, `bms.h` and `Makefile` - Battery management system
    * Create a new file called `bms.h` and copy the following code to it
        ```c++
        #ifndef HYPED_GIT_WSHOP_BMS_H
        #define HYPED_GIT_WSHOP_BMS_H
        
        
        class BatteryManagementSystem
        {
          public:
            BatteryManagementSystem();
        
            /// TASKS 9 (BOTH) /////////////////////////////////////////////////////////
            
            /// END OF TASKS 9AB ///////////////////////////////////////////////////////
        };
        
        
        #endif //HYPED_GIT_WSHOP_BMS_H
        ```
    * Create a new file called `bms.cpp` and copy the following code to it
        ```c++
        #include "bms.h"

        BatteryManagementSystem::BatteryManagementSystem()
        {
        }

        /// TASK 9 (BOTH) //////////////////////////////////////////////////////////////
        
        /// END OF TASKS 9AB ///////////////////////////////////////////////////////////
        ```
    * Open `Makefile`, locate place for TASK 6 and uncomment the code there to get something like
        ```mk
        bms.o : bms.cpp bms.h
	        $(CC) $(CFLAGS) bms.cpp
        ```
    * Notice the difference in the output of `git status` for the newly created file
    * Commit `bms.h` and `bms.cpp` in one commit and `Makefile` in separate commits
7. **CHANGE: both people work simultaneously on different pieces of code from now on** - Person B `git push`es first
    - Person A - `accelerometer.h` - Define accelerometer's error
        * Open `accelerometer.h`, locate place for TASK 7 and edit the line so that it looks something like below (0 is best but also most boring)
            ```c++
            double error = <real_number_here>;
            ```
        * Wait for your teammate to `git push` before you `git pull --rebase`
    - Person B - `navigation.cpp` - Implement way for adding accelerometers to the navigation system
        * Open `navigation.cpp`, locate the place for TASK 7 and copy the following code there
            ```c++
            this->accelerometers.push_back(a);
            ```
8. Person A `git push`es first
    - Person A - `navigation.cpp` - Implement calculation of velocity from acceleration
        * Open `navigation.cpp`, locate the place for your part of TASK 8 (inside `get_velocity()` function) and copy the following code there
            ```c++
            double a = this->get_acceleration();
            this->velocity += a*DT; //integrate
            return this->velocity;
            ```
    - Person B - `navigation.cpp` - Implement calculation of position from velocity
        * Open `navigation.cpp`, locate the place for your part of TASK 8 (inside `get_position()` function) and copy the following code there
            ```c++
            double v = this->get_velocity();
            this->position += v*DT; //integrate
            return this->position;
            ```
        * Wait for your teammate to `git push` before you `git pull --rebase`
9. Person B `git push`es first
    - Person A - `bms.h` and `bms.cpp` - Sensing voltage
        * Open `bms.h`, locate place for TASK 9 and copy the following code there
            ```c++
            double get_voltage();
            ```
        * Open `bms.cpp`, locate place for TASK 9 and copy the following code there. Change the 0 to something else.
            ```c++
            double BatteryManagementSystem::get_voltage()
            {
              return 0;
            }
            ```
        * Commit both files in a single commit
        * Wait for your teammate to `git push` before you `git pull --rebase`
        * **SLOW DOWN** You've got a conflict. Now go and carefully resolve it. Take your time.
    - Person B - `bms.h` and `bms.cpp` - Sensing current
        * Open `bms.h`, locate place for TASK 9 and copy the following code there
            ```c++
            double get_current();
            ```
        * Open `bms.cpp`, locate place for TASK 9 and copy the following code there. Change the 0 to something else.
            ```c++
            double BatteryManagementSystem::get_current()
            {
              return 0;
            }
            ```
10. Person A `git push`es first
    - Person A - `pod.h` and `Makefile` - Integrate battery management system with the pod
        * Open `pod.h`, locate TASK 10.1, and include the BMS header by copying the following code
            ```c++
            #include "bms.h"
            ```
        * Locate TASK 10.2 and declare the BMS field as follows
            ```c++
            BatteryManagementSystem bms;
            ```
        * Open `Makefile`
            * Append ```bms.h``` to the lines starting with ```pod.o :``` and ```main.o :```
            * Append ```bms.o``` to the lines starting with ```main :``` and ```OBJS = ```
    - Person B - `pod.h`, `pod.cpp` and `Makefile` - Integrate navigation system with the pod
        * Open `pod.h`, locate TASK 10.1, and include the navigation header by copying the following code
            ```c++
            #include "navigation.h"
            ```
        * Locate TASK 10.2 and declare the nav field as follows
            ```c++
            Navigation nav;
            ```
        * Open `pod.cpp`, locate TASK 10, and initialize the navigation system with one accelerometer as follows
            ```c++
            this->nav.add_accelerometer(new Accelerometer);
            ```
        * Open `Makefile`
            * Append ```navigation.h``` to the lines starting with ```pod.o :``` and ```main.o :```
            * Append ```navigation.o``` to the lines starting with ```main :``` and ```OBJS = ```
        * Wait for your teammate to `git push` before you `git pull --rebase`
        * **SLOW DOWN** You've got some conflicts. Now go and carefully resolve them. Take your time.


### Summary of tasks
|Task # | Person A                                                         | Person B                                                     |
|:----|--------------------------------------------------------------------|--------------------------------------------------------------|
| 1 | Name your pod - edit `pod.cpp`                                       |                                                              |
| 2 |                                                                      |  Max speed - edit `pod.cpp`                                  |
| 3 | Pressure vessel temperature - edit `pod.h` and `pod.cpp`             |                                                              |
| 4 |                                                                      | Pressure vessel pressure - edit `pod.h` and `pod.cpp`        |
| 5 | Create `main.cpp` and update `Makefile`                              |                                                              |
| 6 |                                                                      | BMS - create `bms.cpp` and `bms.h` and update `Makefile`     |
| 7 | Accelerometer error - edit `accelerometer.h`<br>`git pull --rebase`  | Edit `navigation.cpp` - adding accelerometers                |
| 8 | Edit  `navigation.cpp` - get velocity                                | Edit `navigation.cpp` - get position<br>`git pull -- rebase` |
| 9 | Edit `bms.h` and `bms.cpp` - get voltage<br>`git pull --rebase` & resolve conflicts | Edit `bms.h` and `bms.cpp` - get current      |
| 10 | Integrate BMS to pod - edit `pod.h` and `Makefile`                  | Integrate navigation to pod - edit `pod.h`, `pod.cpp` and `Makefile`<br>`git pull --rebase` & resolve conflicts |
