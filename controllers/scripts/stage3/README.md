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
    * Open `pod.cpp`, locate place for TASKS 3&4 and copy-paste the following code there (you can change the 0 there if you want a more comfortable temperature)
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
    * Open `pod.cpp`, locate place for TASKS 3&4, copy the following code and paste it below the function from previous task (you can change the 0 there if you want a more comfortable pressure)
        ```c++
        double Pod::get_pressure()
        {
          return 0;
        }
        ```
    * When done, commit both files in a single commit (ofc don't forget push and stuff as always)



### Summary of tasks
|Task # | Person A                                                         | Person B                                                     |
|:----|--------------------------------------------------------------------|--------------------------------------------------------------|
| 1 | Name your pod - edit `pod.cpp`                                       |                                                              |
| 2 |                                                                      |  Max speed - edit `pod.cpp`                                  |
| 3 | Pressure vessel temperature - edit `pod.h` and `pod.cpp`             |                                                              |
| 4 |                                                                      | Pressure vessel pressure - edit `pod.h` and `pod.cpp`        |


