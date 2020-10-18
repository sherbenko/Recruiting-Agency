(function () {
    let walkthrough;
    walkthrough = {
        index: 0,
        nextScreen: function () {
            if (this.index < this.indexMax()) {
                this.index++;
                return this.updateScreen();
            }
        },
        prevScreen: function () {
            if (this.index > 0) {
                this.index--;
                return this.updateScreen();
            }
        },
        updateScreen: function () {
            this.reset();
            this.goTo(this.index);
            return this.setBtns();
        },
        setBtns: function () {
            var $lastBtn, $nextBtn, $prevBtn;
            $nextBtn = document.querySelectorAll('.next-screen');
            $prevBtn = document.querySelectorAll('.prev-screen');
            $lastBtn = document.querySelectorAll('.finish');
            if (walkthrough.index === walkthrough.indexMax()) {
                $nextBtn.prop('disabled', true);
                $prevBtn.prop('disabled', false);
                return $lastBtn.addClass('active').prop('disabled', false);
            } else if (walkthrough.index === 0) {
                $nextBtn.prop('disabled', false);
                $prevBtn.prop('disabled', true);
                return $lastBtn.removeClass('active').prop('disabled', true);
            } else {
                $nextBtn.prop('disabled', false);
                $prevBtn.prop('disabled', false);
                return $lastBtn.removeClass('active').prop('disabled', true);
            }
        },
        goTo: function (index) {
            document.querySelectorAll('.screen').eq(index).addClass('active');
            return document.querySelectorAll('.dot').eq(index).addClass('active');
        },
        reset: function () {
            return document.querySelectorAll('.screen, .dot').removeClass('active');
        },
        indexMax: function () {
            return document.querySelectorAll('.screen').length - 1;
        },
        closeModal: function () {
            document.querySelectorAll('.walkthrough, .shade').removeClass('reveal');
            return setTimeout(() => {
                document.querySelectorAll('.walkthrough, .shade').removeClass('show');
                this.index = 0;
                return this.updateScreen();
            }, 200);
        },
        openModal: function () {
            document.querySelectorAll('.walkthrough, .shade').addClass('show');
            setTimeout(() => {
                return document.querySelectorAll('.walkthrough, .shade').addClass('reveal');
            }, 200);
            return this.updateScreen();
        }
    };

    document.querySelectorAll('.next-screen').click(function () {
        return walkthrough.nextScreen();
    });
    document.querySelectorAll('.prev-screen').click(function () {
        return walkthrough.prevScreen();
    });
    document.querySelectorAll('.close').click(function () {
        return walkthrough.closeModal();
    });
    document.querySelectorAll('.open-walkthrough').click(function () {
        return walkthrough.openModal();
    });
    walkthrough.openModal();

    // Optionally use arrow keys to navigate walkthrough
    return document.keydown(function (e) {
        switch (e.which) {
            case 37:
                // left
                walkthrough.prevScreen();
                break;
            case 38:
                // up
                walkthrough.openModal();
                break;
            case 39:
                // right
                walkthrough.nextScreen();
                break;
            case 40:
                // down
                walkthrough.closeModal();
                break;
            default:
                return;
        }

        e.preventDefault();
    });

}).call(this);

