package com.kolyarm.sbhelpers;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.audio.Sound;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.BitmapFont;
import com.badlogic.gdx.graphics.g2d.TextureRegion;
import com.badlogic.gdx.graphics.g3d.model.Animation;

/**
 * Created by joseph on 17.02.18.
 */

public class AssetLoader {

    public static Texture bg;

    public static Texture rocket;
    public static Texture ufo;
    public static Texture asteroid;
    public static Texture bullet;
    public static Texture planet1, planet2, planet3, planet4, planet5, planet6, planet7;

    public static Sound shot, explosion1, explosion2, lose;

    public static BitmapFont font, shadow;
    public static void load() {
        bg = new Texture(Gdx.files.internal("data/bg.png"));

        rocket = new Texture(Gdx.files.internal("data/rocket.png"));
        ufo = new Texture(Gdx.files.internal("data/ufo.png"));
        asteroid = new Texture(Gdx.files.internal("data/asteroid.png"));
        bullet = new Texture(Gdx.files.internal("data/bullet.png"));

        planet1 = new Texture(Gdx.files.internal("data/planet1.png"));
        planet2 = new Texture(Gdx.files.internal("data/planet2.png"));
        planet3 = new Texture(Gdx.files.internal("data/planet3.png"));
        planet4 = new Texture(Gdx.files.internal("data/planet4.png"));
        planet5 = new Texture(Gdx.files.internal("data/planet5.png"));
        planet6 = new Texture(Gdx.files.internal("data/planet6.png"));
        planet7 = new Texture(Gdx.files.internal("data/planet7.png"));

        shot = Gdx.audio.newSound(Gdx.files.internal("data/shot.mp3"));
        explosion1 = Gdx.audio.newSound(Gdx.files.internal("data/explosion1.mp3"));
        explosion2 = Gdx.audio.newSound(Gdx.files.internal("data/explosion2.mp3"));
        lose = Gdx.audio.newSound(Gdx.files.internal("data/lose.mp3"));

        font = new BitmapFont(Gdx.files.internal("data/text.fnt"));
        font.getData().setScale(1f, - 1f);
        shadow = new BitmapFont(Gdx.files.internal("data/shadow.fnt"));
        shadow.getData().setScale(1f, -1f);
    }

    public static void dispose() {
        bg.dispose();;

        rocket.dispose();
        bullet.dispose();
        asteroid.dispose();
        ufo.dispose();

        planet1.dispose();
        planet2.dispose();
        planet3.dispose();
        planet4.dispose();
        planet5.dispose();
        planet6.dispose();
        planet7.dispose();

        shot.dispose();
        explosion1.dispose();
        explosion2.dispose();
        lose.dispose();

        font.dispose();
        shadow.dispose();
    }
}
