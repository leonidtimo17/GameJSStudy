package com.kolyarm.gameobjects;

import com.kolyarm.gameworld.GameWorld;
import com.kolyarm.starbatlle.StarBattle;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;

/**
 * Created by joseph on 25.02.2018.
 */

public class ScrollHandler {
    private GameWorld world;

    private Planet planet1, planet2, planet3, planet4, planet5, planet6, planet7;
    private List<Ufo> ufoList = new ArrayList<Ufo>();
    private List<Asteroid> asteroidList = new ArrayList<Asteroid>();
    private List<Bullet> bulletList = new ArrayList<Bullet>();
    private Random r;
    public ScrollHandler(GameWorld world) {
        this.world = world;

        r = new Random();

        planet1 = newPlanet();
        planet2 = newPlanet();
        planet3 = newPlanet();
        planet4 = newPlanet();
        planet5 = newPlanet();
        planet6 = newPlanet();
        planet7 = newPlanet();

        float ufoX;
        float ufoY;
        for (int i = 0; i < world.UFO_NUMBER; i++) {
            ufoX = r.nextInt((int)StarBattle.SCREEN_WIDTH);
            ufoY = r.nextInt((int)StarBattle.SCREEN_HEIGHT);
            ufoList.add(new Ufo(StarBattle.SCREEN_WIDTH + ufoX, ufoY, Ufo.SIZE, Ufo.SIZE,Ufo.SPEED));
        }

        float asteroidX;
        float asteroidY;
        float asteroidVelosityX;
        float asteroidVelosityY;
        for (int i = 0; i < world.ASTEROID_NUMBER; i++) {
            asteroidX = r.nextInt((int)StarBattle.SCREEN_WIDTH);
            asteroidY = r.nextInt((int)StarBattle.SCREEN_HEIGHT);
            asteroidVelosityX = (r.nextInt(9) + 1) * 0.2f * Asteroid.SPEED;
            asteroidVelosityY = (r.nextInt(9) + 1) * 0.1f * Asteroid.SPEED;

            asteroidList.add(new Asteroid(StarBattle.SCREEN_WIDTH + asteroidX, asteroidY, Ufo.SIZE, Ufo.SIZE,asteroidVelosityX, asteroidVelosityY));
        }
    }

    public void update(float delta) {
        planet1.update(delta);
        planet2.update(delta);
        planet3.update(delta);
        planet4.update(delta);
        planet5.update(delta);
        planet6.update(delta);
        planet7.update(delta);

        for (int i = 0; i < world.UFO_NUMBER; i++) {
            ufoList.get(i).update(delta);
        }

        for (int i = 0; i < world.ASTEROID_NUMBER; i++) {
            asteroidList.get(i).update(delta);
        }

        for (int i = 0; i < bulletList.size(); i++) {
            bulletList.get(i).update(delta);
        }

        if (planet1.isScrolledLeft) {
            planet1.reset();
        }

        if (planet2.isScrolledLeft) {
            planet2.reset();
        }

        if (planet3.isScrolledLeft) {
            planet3.reset();
        }

        if (planet4.isScrolledLeft) {
            planet4.reset();
        }

        if (planet5.isScrolledLeft) {
            planet5.reset();
        }

        if (planet6.isScrolledLeft) {
            planet6.reset();
        }

        if (planet7.isScrolledLeft) {
            planet7.reset();
        }

        for (int i = 0; i < world.UFO_NUMBER; i++) {
            if ((ufoList.get(i).isScrolledLeft)) {
                ufoList.get(i).reset();
            }
        }

        for (int i = 0; i < world.ASTEROID_NUMBER; i++) {
            if ((asteroidList.get(i).isScrolledLeft)) {
                asteroidList.get(i).reset();
            }

        }

        int k = bulletList.size();
        for (int i = 0; i < k; i++) {
            if ((bulletList.get(i).getX() > StarBattle.SCREEN_WIDTH)) {
                bulletList.remove(i);
                i--;
                k--;
            }
        }
    }

    public void stop(){
        planet1.stop();
        planet2.stop();
        planet3.stop();
        planet4.stop();
        planet5.stop();
        planet6.stop();
        planet7.stop();

        for (int i = 0; i < world.ASTEROID_NUMBER; i++) {
            asteroidList.get(i).stop();
        }

        for (int i = 0; i < world.UFO_NUMBER; i++) {
            ufoList.get(i).stop();
        }

        for (int i = 0; i < bulletList.size(); i++) {
            bulletList.remove(0);
        }
    }


    public Planet getPlanet1() {
        return planet1;
    }
    public Planet getPlanet2() {
        return planet2;
    }
    public Planet getPlanet3() {
        return planet3;
    }
    public Planet getPlanet4() {
        return planet4;
    }
    public Planet getPlanet5() {
        return planet5;
    }
    public Planet getPlanet6() {
        return planet6;
    }
    public Planet getPlanet7() {
        return planet7;
    }

    public List<Ufo> getUfoList() {
        return ufoList;
    }

    public List<Asteroid> getAsteroidList() {
        return asteroidList;
    }

    public List<Bullet> getBulletList() {
        return bulletList;
    }

    private Planet newPlanet() {
        float p = r.nextInt(4) + 1;
        float x = (r.nextInt(5) + 1) * 150 + StarBattle.SCREEN_WIDTH;
        float y = (r.nextInt(5) + 1) * 90;
        return new Planet(x, y, Planet.SIZE * p, Planet.SPEED / p);
    }

    public void onRestart() {
        planet1.reset();
        planet2.reset();
        planet3.reset();
        planet4.reset();
        planet5.reset();
        planet6.reset();
        planet7.reset();

        for (int i = 0; i < asteroidList.size(); i++) {
            asteroidList.get(i).reset();
        }

        for (int i = 0; i < ufoList.size(); i++) {
            ufoList.get(i).reset();
        }

        for (int i = 0; i < bulletList.size(); i++) {
            bulletList.remove(0);
        }
    }
}
