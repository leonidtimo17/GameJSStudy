package com.kolyarm.gameworld;

import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;
import com.badlogic.gdx.graphics.glutils.ShapeRenderer;
import com.kolyarm.gameobjects.Asteroid;
import com.kolyarm.gameobjects.Bullet;
import com.kolyarm.gameobjects.Planet;
import com.kolyarm.gameobjects.Rocket;
import com.kolyarm.gameobjects.ScrollHandler;
import com.kolyarm.gameobjects.Ufo;
import com.kolyarm.sbhelpers.AssetLoader;
import com.kolyarm.starbatlle.StarBattle;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by joseph on 17.02.18.
 */

public class GameRenderer {
    private GameWorld world;
    private OrthographicCamera cam;

    private ShapeRenderer shapeRenderer;

    private SpriteBatch batcher;

    private Rocket rocket;
    private Planet planet1, planet2, planet3, planet4, planet5, planet6, planet7;
    private List<Ufo> ufoList = new ArrayList<Ufo>();
    private List<Asteroid> asteroidList = new ArrayList<Asteroid>();
    private List<Bullet> bulletList = new ArrayList<Bullet>();

    private ScrollHandler scroller;

    private Texture bg;
    private Texture rocketTexture;
    private Texture bulletTexture;
    private Texture ufoTexture;
    private Texture asteroidTexture;
    private Texture planet1Texture, planet2Texture, planet3Texture, planet4Texture,
            planet5Texture, planet6Texture,  planet7Texture;

    public GameRenderer(GameWorld world) {
        this.world = world;

        cam = new OrthographicCamera();
        cam.setToOrtho(true, StarBattle.SCREEN_WIDTH, StarBattle.SCREEN_HEIGHT);

        batcher = new SpriteBatch();
        batcher.setProjectionMatrix(cam.combined);

        shapeRenderer = new ShapeRenderer();
        shapeRenderer.setProjectionMatrix(cam.combined);

        initGameObjects();
        initAssets();
    }

    public void render() {
        ufoList = scroller.getUfoList();
        asteroidList = scroller.getAsteroidList();
        bulletList = scroller.getBulletList();

//        shapeRenderer.begin(ShapeRenderer.ShapeType.Filled);
//
//        // Заливаем задний фон
//        shapeRenderer.setColor(25 / 255.0f, 25 / 255.0f, 112 / 255.0f, 1);
//        shapeRenderer.rect(0, 0, StarBattle.SCREEN_WIDTH, StarBattle.SCREEN_HEIGHT);
//
//        shapeRenderer.end();


        batcher.begin();

        drawBg();
        drawAsteroids();
        drawUfos();
        drawBullets();
        drawScore();

        if (rocket.isAlive()) {
            batcher.draw(rocketTexture, rocket.getX(), rocket.getY(), rocket.getWidth(), rocket.getHeight());
        }

        if (world.isReady()) {
            drawStartMessage();
        } else {
            if (world.isGameOver()) {
                drawGameOverMessage();
            }
        }
        batcher.end();
    }

    private void initGameObjects(){
        rocket = world.getRocket();
        scroller = world.getScroller();
        planet1 = scroller.getPlanet1();
        planet2 = scroller.getPlanet2();
        planet3 = scroller.getPlanet3();
        planet4 = scroller.getPlanet4();
        planet5 = scroller.getPlanet5();
        planet6 = scroller.getPlanet6();
        planet7 = scroller.getPlanet7();
    }

    private void initAssets() {
        bg = AssetLoader.bg;

        rocketTexture = AssetLoader.rocket;
        bulletTexture = AssetLoader.bullet;
        planet1Texture = AssetLoader.planet1;
        planet2Texture = AssetLoader.planet2;
        planet3Texture = AssetLoader.planet3;
        planet4Texture = AssetLoader.planet4;
        planet5Texture = AssetLoader.planet5;
        planet6Texture = AssetLoader.planet6;
        planet7Texture = AssetLoader.planet7;

        ufoTexture = AssetLoader.ufo;
        asteroidTexture = AssetLoader.asteroid;
    }

    private void drawBullets() {
        for (int i = 0; i < bulletList.size(); i++) {
            batcher.draw(bulletTexture, bulletList.get(i).getX(), bulletList.get(i).getY(), bulletList.get(i).getWidth(), bulletList.get(i).getHeight());
        }
    }

    private void drawUfos() {
        for (int i = 0; i < world.UFO_NUMBER; i++) {
            batcher.draw(ufoTexture, ufoList.get(i).getX(), ufoList.get(i).getY(), ufoList.get(i).getWidth(), ufoList.get(i).getHeight());
        }
    }

    private void drawAsteroids() {
        for (int i = 0; i < world.ASTEROID_NUMBER; i++) {
            batcher.draw(asteroidTexture, asteroidList.get(i).getX(), asteroidList.get(i).getY(), asteroidList.get(i).getWidth(), asteroidList.get(i).getHeight());
        }
    }

    private void drawBg(){
        batcher.draw(bg, 0, 0, StarBattle.SCREEN_WIDTH, StarBattle.SCREEN_HEIGHT);
        batcher.draw(planet1Texture, planet1.getX(), planet1.getY(), planet1.getWidth(), planet1.getHeight());
        batcher.draw(planet2Texture, planet2.getX(), planet2.getY(), planet2.getWidth(), planet2.getHeight());
        batcher.draw(planet3Texture, planet3.getX(), planet3.getY(), planet3.getWidth(), planet3.getHeight());
        batcher.draw(planet4Texture, planet4.getX(), planet4.getY(), planet4.getWidth(), planet4.getHeight());
        batcher.draw(planet5Texture, planet5.getX(), planet5.getY(), planet5.getWidth(), planet5.getHeight());
        batcher.draw(planet6Texture, planet6.getX(), planet6.getY(), planet6.getWidth(), planet6.getHeight());
        batcher.draw(planet7Texture, planet7.getX(), planet7.getY(), planet7.getWidth(), planet7.getHeight());
    }

    private void drawScore() {
        AssetLoader.font.getData().setScale(1f, - 1f);
        String score = "" + world.getScore();
        AssetLoader.shadow.draw(batcher, score,
                (StarBattle.SCREEN_WIDTH / 2) - (12 * score.length()), 12);
        AssetLoader.font.draw(batcher, score,
                (StarBattle.SCREEN_WIDTH / 2) - (12 * score.length() - 4), 8);
    }

    private void drawStartMessage(){
        AssetLoader.font.getData().setScale(0.5f, - 0.5f);
        AssetLoader.font.draw(batcher, "Press any key to start" , 300, 200);
        AssetLoader.font.draw(batcher, "Use W, S, A, D or arrows to move" , 200, 300);
        AssetLoader.font.draw(batcher, "Space to shot" , 400, 350);
    }

    private void drawGameOverMessage() {
        AssetLoader.font.getData().setScale(2f, - 2f);
        AssetLoader.font.draw(batcher, "Game Over" , 150, 200);

        AssetLoader.font.getData().setScale(0.5f, - 0.5f);
        AssetLoader.font.draw(batcher, "Press any key to start" , 300, 520);
    }
}
