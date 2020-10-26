package com.kolyarm.gameworld;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.math.Intersector;
import com.badlogic.gdx.math.Rectangle;
import com.kolyarm.gameobjects.Bird;
import com.kolyarm.gameobjects.Rocket;
import com.kolyarm.gameobjects.ScrollHandler;
import com.kolyarm.sbhelpers.AssetLoader;

/**
 * Created by joseph on 17.02.18.
 */

public class GameWorld {

    public enum GameState {READY, RUNNING, GAMEOVER}

    public static int UFO_NUMBER = 10;
    public static int ASTEROID_NUMBER = 10;

    public static int ASTOROID_SCORE = 10;
    public static int UFO_SCORE = 5;

    private Bird bird;
    private Rocket rocket;
    private ScrollHandler scroller;

    private int score;

    private GameState currentState;

    public GameWorld(int midPointY) {
        currentState = GameState.READY;
        bird = new Bird(33, midPointY - 5, 17, 12);
        rocket = new Rocket(0,midPointY, 90, 55, this);
        scroller = new ScrollHandler(this);
        score = 0;

    }
    
    public void update(float delta) {
        switch (currentState) {
            case READY:
                updateReady(delta);
                break;
            
            case RUNNING:
            
                default:
                updateRunning(delta);
                break;
        }
    }

    private void updateReady(float delta) {
    }

    public void updateRunning(float delta) {
        scroller.update(delta);
        bird.update(delta);
        rocket.update();

        checkRocketIntersecion();
        checkBulletAsteroidIntersection();
        checkBulletUfoIntersection();
    }

    public Bird getBird() {
        return bird;
    }

    public Rocket getRocket() {
        return rocket;
    }

    public ScrollHandler getScroller() {
        return scroller;
    }

    private void checkRocketIntersecion() {
        for (int i = 0; i <scroller.getAsteroidList().size() ; i++) {
            if(Intersector.overlaps(scroller.getAsteroidList().get(i).getBoundingCircle(), rocket.getBoundingRectangle())) {
                currentState = GameState.GAMEOVER;
                rocket.die();
            }
        }

        for (int i = 0; i <scroller.getUfoList().size() ; i++) {
            if(Intersector.overlaps(scroller.getUfoList().get(i).getBoundingCircle(), rocket.getBoundingRectangle())) {
                rocket.die();
                currentState = GameState.GAMEOVER;
            }
        }
    }

    private void checkBulletUfoIntersection(){
        for (int i = 0; i < scroller.getUfoList().size(); i++) {
            for (int j = 0; j < scroller.getBulletList().size(); j++) {
                if (Intersector.overlaps(scroller.getUfoList().get(i).getBoundingCircle(), scroller.getBulletList().get(j).getBoundingCircle())){
                    scroller.getUfoList().get(i).setDurability(scroller.getUfoList().get(i).getDurability() - 1);
                    scroller.getBulletList().remove(j);
                    j--;
                    score += UFO_SCORE;
                }
            }
        }
    }

    private void checkBulletAsteroidIntersection() {
        for (int i = 0; i < scroller.getAsteroidList().size(); i++) {
            for (int j = 0; j < scroller.getBulletList().size(); j++) {
                if (Intersector.overlaps(scroller.getAsteroidList().get(i).getBoundingCircle(), scroller.getBulletList().get(j).getBoundingCircle())){
                    scroller.getAsteroidList().get(i).setDurability(scroller.getAsteroidList().get(i).getDurability() - 1);
                    scroller.getBulletList().remove(j);
                    j--;
                    score += ASTOROID_SCORE;
                }
            }
        }
    }

    public boolean isRunning() {
        return currentState == GameState.RUNNING;
    }
    public boolean isReady() {
        return currentState == GameState.READY;
    }

    public boolean isGameOver() {
        return currentState == GameState.GAMEOVER;
    }

    public void start() {
        currentState = GameState.RUNNING;
    }

    public void restart() {
        score = 0;
        rocket.onRestart();
        scroller.onRestart();

        currentState = GameState.READY;

    }

    public int getScore() {
        return score;
    }
}
