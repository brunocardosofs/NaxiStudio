/******************************************************************************
    Copyright (C) 2024 by Bruno Cardoso <contato@brunocardosofm.com.br>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
******************************************************************************/



#include "player.h"
#include "./ui_player.h"

#include <QFileInfo>
#include <QFile>
#include <QDateTime>
#include <QSettings>

#include "./widgets/listfolders.h"

#include <QDir>

#include<QDebug>

QSettings settings("NaxiStudio", "NaxiStudio Player");

QString currentFolder;
QString pathDB;

//QJsonArray foldersMusic;
//QJsonArray foldersJingle;
//QJsonArray foldersOther;
//QJsonArray foldersCommercial;

Player::Player(QWidget *parent):QMainWindow(parent), ui(new Ui::player)
{
    ui->setupUi(this);

    foldersMusic;
    foldersJingle;
    foldersOther;
    foldersCommercial;

    teste = "Olá Mundo!!";

    initApp();

    // connect(ui->listWidget, &QListWidget::itemDoubleClicked, this, &player::loadMediasCatalog);

    // Creating date and time

    dateTime = new QTimer(this);
    updateClock();
    connect(dateTime, SIGNAL(timeout()), this, SLOT(updateClock()));
    dateTime->start(1000);


    // Creating and configuring players

    MPlayer1 = new QMediaPlayer();
    MPlayer1AudioOutput = new QAudioOutput();
    MPlayer1AudioOutput->setVolume(100);
    MPlayer1->setAudioOutput(MPlayer1AudioOutput);

    MPlayer2 = new QMediaPlayer();
    MPlayer2AudioOutput = new QAudioOutput();
    MPlayer2AudioOutput->setVolume(100);
    MPlayer2->setAudioOutput(MPlayer2AudioOutput);

    MPlayer3 = new QMediaPlayer();
    MPlayer3AudioOutput = new QAudioOutput();
    MPlayer3AudioOutput->setVolume(100);
    MPlayer3->setAudioOutput(MPlayer3AudioOutput);


    // Connect players

    connect(MPlayer1, &QMediaPlayer::durationChanged, this, [=](qint64 duration){updateDuration(duration, 0);});
    connect(MPlayer1, &QMediaPlayer::positionChanged, this, [=](qint64 progress){updateProgress(progress, 0);});

    connect(MPlayer2, &QMediaPlayer::durationChanged, this, [=](qint64 duration){updateDuration(duration, 1);});
    connect(MPlayer2, &QMediaPlayer::positionChanged, this, [=](qint64 progress){updateProgress(progress, 1);});

    connect(MPlayer3, &QMediaPlayer::durationChanged, this, [=](qint64 duration){updateDuration(duration, 2);});
    connect(MPlayer3, &QMediaPlayer::positionChanged, this, [=](qint64 progress){updateProgress(progress, 2);});
}

Player::~Player()
{
    delete ui;
}

void Player::initApp(){

    if(!settings.contains("db")){
        settings.setValue("db", QCoreApplication::applicationDirPath());
    }

    settings.setValue("db", "D:/Arquivos/Projetos/Qt/NaxiStudio/DB");
    pathDB = settings.value("db").toString();

    listFolders *folders = new listFolders(this);
    folders->setObjectName("Folders");
    folders->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    connect(folders, &listFolders::loadPlayer, this, &Player::receivePath);

    QScrollArea *scroll = new QScrollArea(this);
    scroll->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);
    scroll->setWidgetResizable(true);
    scroll->setWidget(folders);
    ui->catalog->layout()->addWidget(scroll);


    ui->loadMediaPlayer1->hide();
    ui->loadMediaPlayer1->raise();
    ui->loadMediaPlayer2->hide();
    ui->loadMediaPlayer2->raise();
    ui->loadMediaPlayer3->hide();
    ui->loadMediaPlayer3->raise();
}

// Updating clock
void Player::updateClock(){
    QDateTime currentTime = QDateTime::currentDateTime();
    ui->dateTime->setText(currentTime.toString("dd/MM/yyyy  hh:mm:ss"));
}

void Player::receivePath(const QString &path){
    loadPlayer(2, path);
}


// Updating player times

void Player::updateDuration(qint64 duration, qint8 player)
{
    QList playerSlider = {ui->player1Slider, ui->player2Slider, ui->player3Slider};
    QList playerDuration = {ui->player1Duration, ui->player2Duration, ui->player3Duration};

    QTime totalTime((duration / 3600000) % 60, (duration / 60000) % 60, (duration / 1000) % 60, (duration) % 1000);

    QString timeMediaFormat = "mm:ss:zzz";
    if(duration > 3600000){
        timeMediaFormat = "hh:mm:ss";
    }

    playerSlider[player]->setRange(0, duration / 100);
    playerDuration[player]->setText(totalTime.toString(timeMediaFormat));
}

void Player::updateProgress(qint64 progress, qint8 player){
    QList playerTime = {ui->player1Time, ui->player2Time, ui->player3Time};
    QList playerSlider = {ui->player1Slider, ui->player2Slider, ui->player3Slider};

    QTime CurrentTime((progress / 3600000) % 60, (progress / 60000) % 60, (progress / 1000) % 60, (progress) % 1000);

    QString timeMediaFormat = "mm:ss:zzz";
    if(progress > 3600000){
        timeMediaFormat = "hh:mm:ss";
    }

    playerSlider[player]->setValue(progress / 100);
    playerTime[player]->setText(CurrentTime.toString(timeMediaFormat));
}


// Temporary buttons

void Player::on_openMusic_clicked()
{
    QString FileName = QFileDialog::getOpenFileName(this, tr("Selecionar Audio"), "", tr("Audio Files (*.mp3 *.wav *.flac *.opus *.webm)"));
    loadPlayer(0, FileName);
}

void Player::on_openMusic1_clicked()
{
    QString FileName = QFileDialog::getOpenFileName(this, tr("Selecionar Audio"), "", tr("Audio Files (*.mp3 *.wav *.flac *.opus *.webm)"));
    loadPlayer(1, FileName);
    //ui->loadMediaPlayer1->setFixedSize(ui->player1->size());
    //ui->loadMediaPlayer1->show();
}

void Player::on_openMusic2_clicked()
{
    QString FileName = QFileDialog::getOpenFileName(this, tr("Selecionar Audio"), "", tr("Audio Files (*.mp3 *.wav *.flac *.opus *.webm)"));
    loadPlayer(2, FileName);
    // QListWidgetItem *itemJingle = new QListWidgetItem("Vinhetas");
    // QListWidgetItem *itemMusic = new QListWidgetItem("Músicas");
    // QListWidgetItem *itemCommercial = new QListWidgetItem("Comerciais");
    // QListWidgetItem *itemOther = new QListWidgetItem("Outros");

    // QFont font("Segoe UI", 10, QFont::Bold);

    // itemJingle->setFont(font);
    // itemMusic->setFont(font);
    // itemCommercial->setFont(font);
    // itemOther->setFont(font);

    // itemJingle->setFlags(Qt::ItemIsEnabled);
    // itemMusic->setFlags(Qt::ItemIsEnabled);
    // itemCommercial->setFlags(Qt::ItemIsEnabled);
    // itemOther->setFlags(Qt::ItemIsEnabled);

    // itemJingle->setData(Qt::TextAlignmentRole, Qt::AlignHCenter);
    // itemMusic->setData(Qt::TextAlignmentRole, Qt::AlignHCenter);
    // itemCommercial->setData(Qt::TextAlignmentRole, Qt::AlignHCenter);
    // itemOther->setData(Qt::TextAlignmentRole, Qt::AlignHCenter);

    // ui->listWidget->clear();


    // ui->listWidget->addItem(itemJingle);
    // foreach (QJsonValue jsonValue, foldersJingle) {
    //     QJsonObject jsonObject = jsonValue.toObject();

    //     QListWidgetItem *item = new QListWidgetItem(jsonObject.value("title").toString());

    //     item->setData(Qt::UserRole + 1, "folder");
    //     item->setData(Qt::UserRole + 2, jsonObject.value("type").toInt());
    //     item->setData(Qt::UserRole + 3, jsonObject.value("path").toString());

    //     ui->listWidget->addItem(item);
    // }

    // ui->listWidget->addItem(itemMusic);
    // foreach (QJsonValue jsonValue, foldersMusic) {
    //     QJsonObject jsonObject = jsonValue.toObject();

    //     QListWidgetItem *item = new QListWidgetItem(jsonObject.value("title").toString());

    //     item->setData(Qt::UserRole + 1, "folder");
    //     item->setData(Qt::UserRole + 2, jsonObject.value("type").toInt());
    //     item->setData(Qt::UserRole + 3, jsonObject.value("path").toString());

    //     ui->listWidget->addItem(item);
    // }

    // ui->listWidget->addItem(itemOther);
    // foreach (QJsonValue jsonValue, foldersOther) {
    //     QJsonObject jsonObject = jsonValue.toObject();

    //     QListWidgetItem *item = new QListWidgetItem(jsonObject.value("title").toString());

    //     item->setData(Qt::UserRole + 1, "folder");
    //     item->setData(Qt::UserRole + 2, jsonObject.value("type").toInt());
    //     item->setData(Qt::UserRole + 3, jsonObject.value("path").toString());

    //     ui->listWidget->addItem(item);
    // }

    // ui->listWidget->addItem(itemCommercial);
    // foreach (QJsonValue jsonValue, foldersCommercial) {
    //     QJsonObject jsonObject = jsonValue.toObject();

    //     QListWidgetItem *item = new QListWidgetItem(jsonObject.value("title").toString());

    //     item->setData(Qt::UserRole + 1, "folder");
    //     item->setData(Qt::UserRole + 2, jsonObject.value("type").toInt());
    //     item->setData(Qt::UserRole + 3, jsonObject.value("path").toString());

    //     ui->listWidget->addItem(item);
    // }
}

void Player::loadMediasCatalog(QListWidgetItem *item){
    if(item->data(Qt::UserRole + 1).toString() == "folder"){
        QDir files(item->data(Qt::UserRole + 3).toString());

        // ui->listWidget->clear();

        // ui->listWidget->insertItem(0, "Voltar");
        // ui->listWidget->item(0)->setData(Qt::TextAlignmentRole, Qt::AlignHCenter);
        // ui->listWidget->item(0)->setFont(QFont("Segoe UI", 10, QFont::Bold));

        // foreach (QFileInfo qfi, files.entryInfoList()) {
        //     QString suffix = qfi.completeSuffix();
        //     if(qfi.isFile() && (suffix == "mp3" || suffix == "wav" || suffix == "opus" || suffix == "aac" || suffix == "flac")){
        //         ui->listWidget->addItem(qfi.fileName());
        //     }
        // }

        // ui->listWidget->verticalScrollBar()->setValue(0);
    }else if(item->text() == "Voltar"){
        on_openMusic2_clicked();
    }
}

void Player::openCatalog(QString path){
    QFile catalog(path);
    catalog.open(QFile::ReadOnly | QFile::Text);
    QTextStream dataCatalog(&catalog);
    QString jsonString = dataCatalog.readAll();
    catalog.close();

    QJsonDocument jsonDocument = QJsonDocument::fromJson(jsonString.toUtf8());
    QJsonArray jsonArray = jsonDocument.array();

    foreach (QJsonValue jsonValue, jsonArray) {
        QJsonObject jsonObject = jsonValue.toObject();

        switch (jsonObject.value("type").toInt()) {
        case 0:
            foldersJingle.append(jsonValue);
            break;
        case 1:
            foldersMusic.append(jsonValue);
            break;
        case 2:
            foldersCommercial.append(jsonValue);
            break;
        default:
            foldersOther.append(jsonValue);
            break;
        }
    }
}

void Player::on_openPlaylist_clicked()
{
    QString openDir = QFileDialog::getExistingDirectory(this, tr("Open Directory"), "", QFileDialog::ShowDirsOnly | QFileDialog::DontResolveSymlinks);

    if(openDir != ""){
        QDir files(openDir);

        foreach (QFileInfo qfi, files.entryInfoList()) {
            QString suffix = qfi.completeSuffix();
            if(qfi.isFile() && (suffix == "mp3" || suffix == "wav" || suffix == "opus" || suffix == "aac" || suffix == "flac")){
                // ui->listWidget->addItem(qfi.fileName());
            }
        }
    }
}


// Loading media in player

void Player::loadPlayer(qint8 player, QString path)
{
    QList players = {MPlayer1, MPlayer2, MPlayer3};
    QList playersTitle = {ui->player1Title, ui->player2Title, ui->player3Title};

    if(path != ""){
        players[player]->setSource(QUrl::fromLocalFile(path));

        QFileInfo fileInfo(path);
        playersTitle[player]->setText(fileInfo.fileName());
    }
}


// Player 1 controls

void Player::on_player1Play_clicked()
{MPlayer1->play();}

void Player::on_player1Pause_clicked()
{MPlayer1->pause();}

void Player::on_player1Stop_clicked()
{MPlayer1->stop();MPlayer1->setPosition(0);}

void Player::on_player1Slider_sliderMoved(int position)
{MPlayer1->setPosition(position * 100);}


// Player 2 controls

void Player::on_player2Play_clicked()
{MPlayer2->play();}

void Player::on_player2Pause_clicked()
{MPlayer2->pause();}

void Player::on_player2Stop_clicked()
{MPlayer2->stop();MPlayer2->setPosition(0);}

void Player::on_player2Slider_sliderMoved(int position)
{MPlayer2->setPosition(position * 100);}


// Player 3 controls

void Player::on_player3Play_clicked()
{MPlayer3->play();}

void Player::on_player3Pause_clicked()
{MPlayer3->pause();}

void Player::on_player3Stop_clicked()
{MPlayer3->stop();MPlayer3->setPosition(0);}

void Player::on_player3Slider_sliderMoved(int position)
{MPlayer3->setPosition(position * 100);}



void Player::on_openConfig_clicked()
{
    windowConfig = new Configurations;
    windowConfig->show();
}

