package com.kolyarm.gameobjects;


import com.badlogic.gdx.math.Circle;
import com.kolyarm.sbhelpers.AssetLoader;
import com.kolyarm.starbatlle.StarBattle;

import java.util.Random;

/**
 * Created by joseph on 25.02.2018.
 */

public class Asteroid extends Scrollable {
    public static float SPEED = - 100;
    public static float SIZE =  100;
    public static int DURABILITY = 2;

    private Random r;
    private float rotation;
    private Circle boundingCircle;
    private int durability;

    public Asteroid(float x, float y, float width, float heigh, float scrollSpeed) {
        super(x, y, width, heigh, scrollSpeed);
        boundingCircle = new Circle();
        durability = DURABILITY;
        r = new Random();
    }

    public Asteroid(float x, float y, float width, float heigh, float scrollSpeedX, float scrollSpeedY) {
        super(x, y, width, heigh, scrollSpeedX);
        velocity.y = scrollSpeedY;
        boundingCircle = new Circle();
        durability = DURABILITY;
        r = new Random();
    }

    public void reset() {
        isScrolledLeft = false;
        durability = DURABILITY;
        position.x = StarBattle.SCREEN_WIDTH + r.nextInt((int) StarBattle.SCREEN_WIDTH);
        position.y = r.nextInt((int) (StarBattle.SCREEN_HEIGHT - SIZE));

        velocity.x = (r.nextInt(9) + 1) * 0.2f * SPEED;
        velocity.y = (r.nextInt(9) + 1) * 0.1f * SPEED;
    }

    @Override
    public void update(float delta){
        position.add(velocity.cpy().scl(delta));
        boundingCircle.set(position.x + SIZE / 2f, position.y + SIZE / 2f, SIZE / 3f);

        if (durability == 0){
            AssetLoader.explosion2.play();
            reset();
        }

        if(position.x + width < 0) {
            isScrolledLeft = true;
        }

        if ((position.y < 0) || (position.y + height > StarBattle.SCREEN_HEIGHT)) {
            velocity.y = -velocity.y;
        }

    }

    public float getRotation() {
        return rotation;
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
