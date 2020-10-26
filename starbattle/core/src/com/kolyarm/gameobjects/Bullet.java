package com.kolyarm.gameobjects;

import com.badlogic.gdx.math.Circle;

/**
 * Created by joseph on 26.02.18.
 */

public class Bullet extends Scrollable {
    public static float SPEED = 300;
    public static float SIZE = 10;

    private Circle boundingCircle;
    public Bullet(float x, float y, float width, float heigh, float scrollSpeed) {
        super(x, y, width, heigh, scrollSpeed);
        boundingCircle = new Circle();
    }

    public Bullet(float x, float y) {
        super(x - SIZE /2f, y - SIZE / 2f, SIZE, SIZE, SPEED);
        boundingCircle = new Circle();
    }

    public void update(float delta) {
        position.add(velocity.cpy().scl(delta));
        boundingCircle.set(position.x + SIZE / 2f, position.y + SIZE / 2f, SIZE / 2f);
    }

    public Circle getBoundingCircle() {
        return boundingCircle;
    }
}
