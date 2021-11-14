# Just to make sure there aren't any errors or problems with the progmram, I've used some sample values.
# When django/ vue is used, the values are input from the user, so they'll get updated I think.
# Please do ensure that all the variables here line up with the inputs given from the website. Thanks a lot :))

number_of_people = 2
length_of_meeting = 5
is_decision_made = True
is_everyone_available = True
issue_complexity = 1

# in the next piece of code, we're referring to email as mode-1 and meeting as mode-2
mode = 1                         # just setting email as the default mode

hourly_rate_of_employees = 15     #just a default value until this can be linked to the actual input
cost_of_meeting = (length_of_meeting/60)*number_of_people*hourly_rate_of_employees


if (number_of_people<=2):
    if (length_of_meeting<=10):
        if(is_decision_made):
            if(is_everyone_available):
                mode = 2
            else:
                mode = 1
        else:
            if(is_everyone_available):
                if(issue_complexity<=2):
                    mode = 1
                else:
                    mode = 2
            else:
                mode = 1
    else:
        if(is_decision_made):
            if(is_everyone_available):
                if(issue_complexity<=2):
                    mode = 1
                else:
                    mode = 2
            else:
                mode = 1
        else:
            if(is_everyone_available):
                if(issue_complexity<=3):
                    mode = 1
                else:
                    mode = 2
            else:
                mode = 1
else:
    if(length_of_meeting<=15):
        if(is_decision_made):
            if(is_everyone_available):
                if(issue_complexity<=2):
                    mode = 1
                else:
                    mode = 2
            else:
                if(issue_complexity<=3):
                    mode = 1
                else:
                    mode = 2
        else:
            if(is_everyone_available):
                if(issue_complexity<=3):
                    mode = 1
                else:
                    mode = 2
            else:
                if(issue_complexity<=4):
                    mode = 1
                else:
                    mode = 2
    else:
        if(is_decision_made):
            if(is_everyone_available):
                if(issue_complexity<=2):
                    mode = 1
                else:
                    mode = 2
            else:
                if(issue_complexity<=3):
                    mode = 1
                else:
                    mode = 2
        else:
            if(is_everyone_available):
                if(issue_complexity<=3):
                    mode = 1
                else:
                    mode = 2
            else:
                if(issue_complexity<=4):
                    mode = 1
                else:
                    mode = 2

"""print("done")
if (mode==1):
    print("Email")
else:
    print("Meeting")
"""