package com.kolyarm.gameobjects;

import com.badlogic.gdx.math.Circle;
import com.kolyarm.sbhelpers.AssetLoader;
import com.kolyarm.starbatlle.StarBattle;

import java.util.Random;

/**
 * Created by joseph on 25.02.2018.
 */

public class Ufo extends Scrollable {
    public static float SPEED = - 200;
    public static float SIZE =  50;
    public static int DURABILITY = 1;

    private Circle boundingCircle;
    private int durability;
    private Random r;

    public Ufo(float x, float y, float width, float heigh, float scrollSpeed) {
        super(x, y, width, heigh, scrollSpeed);
        boundingCircle = new Circle();
        durability = DURABILITY;
        r = new Random();

    }

    public void reset() {
        isScrolledLeft = false;
        durability = DURABILITY;
        position.x = StarBattle.SCREEN_WIDTH + r.nextInt((int) StarBattle.SCREEN_WIDTH);
        position.y = (float) r.nextInt((int) (StarBattle.SCREEN_HEIGHT - SIZE));
    }

    public void update(float delta) {
        position.add(velocity.cpy().scl(delta));
        boundingCircle.set(position.x + SIZE / 2f, position.y + SIZE / 2f, SIZE / 2f);

        if(position.x + width < 0) {
            isScrolledLeft = true;
        }

        if (durability == 0){
            AssetLoader.explosion1.play();
            reset();
        }
    }

    public Circle getBoundingCircle() {
        return boundingCircle;
    }

    public int getDurability() {
        return durability;
    }

    public void setDurability(int durability) {
        this.durability = durability;
    }
}
