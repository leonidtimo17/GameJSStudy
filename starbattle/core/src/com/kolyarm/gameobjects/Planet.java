package com.kolyarm.gameobjects;


import com.kolyarm.starbatlle.StarBattle;

import java.util.Random;

/**
 * Created by joseph on 25.02.2018.
 */

public class Planet extends Scrollable {

    public static float SPEED = - 100;
    public static float SIZE = 50;

    private Random r;

    public Planet(float x, float y, float width, float scrollSpeed) {
        super(x, y, width, width, scrollSpeed);
        r = new Random();
    }

    public void reset(){
        int p = r.nextInt(4) + 1;
        int newX = 150 * r.nextInt(5) + 1;
        int newY  = 90 * r.nextInt(5) + 1;

        isScrolledLeft = false;
        position.x = (float) newX + StarBattle.SCREEN_WIDTH;
        position.y = (float) newY;

        velocity.x = SPEED / p;
        width = SIZE * p;
        height = SIZE *p;
    }

}
