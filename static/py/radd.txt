# -*- coding: utf-8 -*-
"""
Created on Mon Mar 26 13:17:10 2018

@author: YY
"""

import random

def get_o_l():
    x=random.random()
    x=int(x*10)
    x=x%2
    return(x)

def get_point(x1,y1,x2,y2):
    dx=x2-x1
    dy=y2-y1
    x3=x1+int(dx*random.random())
    y3=y1+int(dy*random.random())
    return(x3,y3)
    