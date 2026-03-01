import os,radd

def get_pic(pic_name):
    os.system('adb shell screencap -p  /sdcard/'+pic_name+'.png')
    os.system('adb pull /sdcard/'+pic_name+'.png')
    
def swipee(x1,y1,x2,y2):
    os.system('adb shell input swipe '+str(x1)+' '+str(y1)+' '+str(x2)+' '+str(y2))
    
def tapp(x1,y1):
    os.system('adb shell input tap '+str(x1)+' '+str(y1))
    
def sw_or_tap(x1,y1,x2,y2):
    x3,y3=radd.get_point(x1,y1,x2,y2)
    x4,y4=radd.get_point(x1,y1,x2,y2)
    if radd.get_o_l()==1:
        swipee(x3,y3,x4,y4)
    else:
        tapp(x3,y3)