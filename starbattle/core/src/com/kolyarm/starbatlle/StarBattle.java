package com.kolyarm.starbatlle;


import com.badlogic.gdx.Game;
import com.badlogic.gdx.Gdx;
import com.kolyarm.sbhelpers.AssetLoader;
import com.kolyarm.screens.GameScreen;

public class StarBattle extends Game {

	public static float SCREEN_WIDTH = 1024;
	public static float SCREEN_HEIGHT = 576;

	@Override
	public void create() {
		Gdx.app.log("StarBattle", "created");
		AssetLoader.load();
		setScreen(new GameScreen());
	}
}
