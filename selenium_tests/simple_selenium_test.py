# Document owned and created by Omar Syed
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

try:
    # CHANGES MUST BE MADE HERE FOR RIGHT DIRECTORY
    driver.get("file:///C:/Users/irock/Documents/Selenium-Tutorial/blackjack-game/index.html")

    time.sleep(2)

    hit_button = driver.find_element(By.ID, "hit-button")
    hit_button.click()
    time.sleep(1)

    player_cards = driver.find_elements(By.CSS_SELECTOR, "#player-cards .card")
    assert len(player_cards) >= 3, "Player should have at least 3 cards after hitting."

    stand_button = driver.find_element(By.ID, "stand-button")
    stand_button.click()
    time.sleep(2)

    game_status = driver.find_element(By.ID, "game-status").text
    print(f"Game Status: {game_status}")
    assert game_status != "", "Game status should be updated after standing."

    restart_button = driver.find_element(By.ID, "restart-button")
    restart_button.click()
    time.sleep(1)

    game_status_after_restart = driver.find_element(By.ID, "game-status").text
    assert game_status_after_restart == "", "Game should be reset after clicking Restart."

finally:
    driver.quit()
