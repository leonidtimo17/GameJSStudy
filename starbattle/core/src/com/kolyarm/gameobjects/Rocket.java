package com.kolyarm.gameobjects;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.Input;
import com.badlogic.gdx.math.Rectangle;
import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.scenes.scene2d.ui.Button;
import com.kolyarm.gameworld.GameWorld;
import com.kolyarm.sbhelpers.AssetLoader;
import com.kolyarm.starbatlle.StarBattle;

/**
 * Created by joseph on 25.02.2018.
 */

public class Rocket {
    private GameWorld world;
    private Vector2 position;

    private float width;
    private float height;
    private Rectangle boundingRectangle;

    private boolean isAlive;

    public Rocket(float x, float y, float width, float height, GameWorld world) {
        this.world = world;
        position = new Vector2(x,y);
        isAlive = true;

        boundingRectangle = new Rectangle();
        this.width = width;
        this.height = height;
    }

    public void update(){
        if (isAlive) {
            if (Gdx.input.isKeyPressed(Input.Keys.W) || Gdx.input.isKeyPressed(Input.Keys.UP)) {
                if (position.y > 0)
                    position.y -= 2;
            }
            if (Gdx.input.isKeyPressed(Input.Keys.S) || Gdx.input.isKeyPressed(Input.Keys.DOWN)) {
                if (position.y < StarBattle.SCREEN_HEIGHT - height)
                    position.y += 2;
            }

            if (Gdx.input.isKeyPressed(Input.Keys.A) || Gdx.input.isKeyPressed(Input.Keys.LEFT)) {
                if (position.x > 0)
                    position.x -= 2;
            }

            if (Gdx.input.isKeyPressed(Input.Keys.D) || Gdx.input.isKeyPressed(Input.Keys.RIGHT)) {
                if (position.x < StarBattle.SCREEN_WIDTH - width)
                    position.x += 2;
            }
        }
        boundingRectangle.set(position.x, position.y, width, height);
    }

    public void onKeyDown(int keycode){

        if (keycode == Input.Keys.SPACE && world.isRunning()){
            float x = position.x + width;
            float y = position.y + height / 2f;
            world.getScroller().getBulletList().add(new Bullet(x, y));
            AssetLoader.shot.play();
        }
    }

    public void onRestart() {
        isAlive = true;
        position.x = 0;
        position.y = (StarBattle.SCREEN_HEIGHT - height) / 2f;
    }

    public void die() {
        isAlive = false;
        AssetLoader.lose.play();
        position.y = StarBattle.SCREEN_HEIGHT * 2f;
    }

    public boolean isAlive() {
        return isAlive;
    }

    public float getX() {
        return position.x;
    }

    public float getY() {
        return position.y;
    }

    public float getWidth() {
        return width;
    }

    public float getHeight() {
        return height;
    }

    public Rectangle getBoundingRectangle() {
        return boundingRectangle;
    }
}
