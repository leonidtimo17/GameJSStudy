package com.kolyarm.sbhelpers;

import com.badlogic.gdx.InputProcessor;
import com.kolyarm.gameobjects.Bird;
import com.kolyarm.gameobjects.Rocket;
import com.kolyarm.gameworld.GameWorld;

/**
 * Created by joseph on 17.02.18.
 */

public class InputHandler implements InputProcessor {
    private GameWorld world;
    private Rocket rocket;

    public InputHandler(GameWorld world) {
        this.world = world;
        this.rocket = world.getRocket();
    }

    @Override
    public boolean keyDown(int keycode) {
        rocket.onKeyDown(keycode);
        if (world.isReady()){
            world.start();
        }

        if (world.isGameOver()) {
            world.restart();
        }
        return true;
    }

    @Override
    public boolean keyUp(int keycode) {
        return false;
    }

    @Override
    public boolean keyTyped(char character) {
        return false;
    }

    @Override
    public boolean touchDown(int screenX, int screenY, int pointer, int button) {
        return true;
    }

    @Override
    public boolean touchUp(int screenX, int screenY, int pointer, int button) {
        return false;
    }

    @Override
    public boolean touchDragged(int screenX, int screenY, int pointer) {
        return false;
    }

    @Override
    public boolean mouseMoved(int screenX, int screenY) {
        return false;
    }

    @Override
    public boolean scrolled(int amount) {
        return false;
    }
}
