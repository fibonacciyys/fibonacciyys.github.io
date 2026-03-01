import time
from interactt import sw_or_tap,get_pic

from PIL import Image
#im1=Image.open('ten_end.png')
#im0=Image.open('ten_start.png')
#print(im0.getpixel((880,790)))
#print(im1.getpixel((880,790)))
#os.system('adb devices')
    
def press_start():
    x1,y1=1350,710
    x2,y2=1520,780
    sw_or_tap(x1,y1,x2,y2)
    
def press_end():
    x1,y1=850,880
    x2,y2=1110,1040
    sw_or_tap(x1,y1,x2,y2)

def select():
    get_pic('yys')
    im=Image.open('yys.png')
    pixx=im.load()
    tup=pixx[880,790]
    print(tup)
    if tup==(163,97,39,255):
        press_start()
        print('start ten')
        return 40
    elif tup==(123,175,221,255):
        press_end()
        print('end ten')
        return 3
    else:
        return 0.5
        
def main():
    timee=0
    while 1:
        xx=select()
        if xx==0.5:
            timee+=1
        else:
            timee=0
        if timee>13:
            sw_or_tap(1245,760,1321,802)
            timee=0  #1283,781,1245,760
        time.sleep(xx)

if __name__=='__main__':
    main()