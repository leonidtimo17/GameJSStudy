package com.kolyarm.starbatlle.desktop;

import com.badlogic.gdx.backends.lwjgl.LwjglApplication;
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration;
import com.kolyarm.starbatlle.StarBattle;

public class DesktopLauncher {
	public static void main (String[] arg) {
		LwjglApplicationConfiguration config = new LwjglApplicationConfiguration();
		config.title = "Star Battle";
		config.width = (int) StarBattle.SCREEN_WIDTH;
		config.height = (int) StarBattle.SCREEN_HEIGHT;
		new LwjglApplication(new StarBattle(), config);
	}
}
