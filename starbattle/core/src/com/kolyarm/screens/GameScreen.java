package com.kolyarm.screens;


import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.InputProcessor;
import com.badlogic.gdx.Screen;
import com.badlogic.gdx.graphics.GL20;
import com.kolyarm.gameworld.GameRenderer;
import com.kolyarm.gameworld.GameWorld;
import com.kolyarm.sbhelpers.InputHandler;
import com.kolyarm.starbatlle.StarBattle;

/**
 * Created by joseph on 17.02.18.
 */

public class GameScreen implements Screen {
    private GameWorld world;
    private GameRenderer renderer;

    public GameScreen() {
        float gameWidth = StarBattle.SCREEN_WIDTH;
        float gameHeight = StarBattle.SCREEN_HEIGHT;

        int midPointY = (int) (gameHeight / 2);

        world = new GameWorld(midPointY);
        renderer = new GameRenderer(world);

        Gdx.input.setInputProcessor(new InputHandler(world) {
        });
    }

    @Override
    public void render(float delta) {
        world.update(delta);
        renderer.render();
    }

    @Override
    public void resize(int width, int height) {
        Gdx.app.log("GameScreen", "resizing");
    }

    @Override
    public void show() {
        Gdx.app.log("GameScreen", "show called");
    }

    @Override
    public void hide() {
        Gdx.app.log("GameScreen", "hide called");
    }

    @Override
    public void pause() {
        Gdx.app.log("GameScreen", "pause called");
    }

    @Override
    public void resume() {
        Gdx.app.log("GameScreen", "resume called");
    }


    @Override
    public void dispose() {

    }
}

