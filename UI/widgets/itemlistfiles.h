#ifndef ITEMLISTFILES_H
#define ITEMLISTFILES_H

#include <QtWidgets>

class itemlistfiles : public QWidget
{
public:
    itemlistfiles(QWidget *parent = nullptr);

protected:
    void mousePressEvent(QMouseEvent *event) override;
    void mouseReleaseEvent(QMouseEvent *event) override;
};

#endif // ITEMLISTFILES_H